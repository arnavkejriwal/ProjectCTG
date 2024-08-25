import chainlit as cl
import os
from pathlib import Path

from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import FlashrankRerank
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Qdrant
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_groq import ChatGroq
from langchain_community.document_loaders import PyPDFLoader
from langchain.agents import initialize_agent, Tool
from langchain.chains.conversation.memory import ConversationBufferWindowMemory

os.environ["GROQ_API_KEY"] = "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"

loader = PyPDFLoader("zubin_foundation.pdf")
documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
docs = text_splitter.split_documents(documents)

embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-base-en-v1.5")
qdrant = Qdrant.from_documents(
    docs,
    embeddings,
    path="./db",
    collection_name="document_embeddings",
)

retriever = qdrant.as_retriever(search_kwargs={"k": 5})

compressor = FlashrankRerank(model="ms-marco-MiniLM-L-12-v2")
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor, base_retriever=retriever
)

llm = ChatGroq(temperature=0, model_name="llama3-70b-8192")
conversational_memory = ConversationBufferWindowMemory(
    memory_key='chat_history',
    k=5,
    return_messages=True
)

prompt_template = """
Use the following pieces of information to answer the user's question about the Zubin Foundation and its projects.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

Context: {context}
Question: {question}

Answer the question and provide additional helpful information,
based on the pieces of information, if applicable. Be succinct.

Responses should be properly formatted to be easily read.

Here are more guidelines for the formatting:

1. If you're using the Knowledge Base tool for general question answering, format your response as usual.
2. If you're using the Step-by-step Instructions tool, format your output as a numbered list, with each step clearly described.
3. If you're using the Website Navigation tool, output should be formatted using bullet points or a clear sequence of actions.
"""
prompt = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)

qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=compression_retriever,
    return_source_documents=True,
    chain_type_kwargs={"prompt": prompt, "verbose": True},
)

@cl.on_chat_start
def start():
    tools = [
        Tool(
            name='Knowledge Base',
            func=qa.invoke,
            description=(
                'Use this tool to access a comprehensive knowledge base for answering general questions.'
                'Ideal for providing detailed information or clarifying concepts.'
            )
        ),
        Tool(
            name='Step-by-step Instructions',
            func=qa.invoke,
            description=(
                'Use this tool to provide step-by-step instructions for performing actions on the website.'
                'Output should be formatted as a numbered list, with each step clearly described.'
                'Include actions such as registering for events, applying for scholarships, and submitting forms.'
                'Example format:\n1. **Step One**: Description of the first step.\n2. **Step Two**: Description of the second step.'
            )
        ),
        Tool(
            name='Website Navigation',
            func=qa.invoke,
            description=(
                'Use this tool to guide users through website navigation.'
                'Output should be formatted using bullet points or a clear sequence of actions.'
                'Include instructions on accessing specific sections, finding resources, or completing tasks on the site.'
                'Example format:\n- **Homepage**: Go to the main page by clicking the "Home" icon.\n- **Navigate to Resources**: Select "Resources" from the top menu to access available materials.'
            )
        )
    ]

    agent = initialize_agent(
        agent='chat-conversational-react-description',
        tools=tools,
        llm=llm,
        verbose=False,
        max_iterations=3,
        early_stopping_method='generate',
        memory=conversational_memory
    )

    cl.user_session.set("agent", agent)

@cl.on_message    
async def main(message: cl.Message):
    agent = cl.user_session.get("agent")
    cb = cl.LangchainCallbackHandler(stream_final_answer=True)
    await cl.Message(content=await cl.make_async(agent.run)(message.content, callbacks=[cb])).send()