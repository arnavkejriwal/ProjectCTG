import { useState, useEffect } from "react";

export const ImageAccordion = ({ items }) => {
  const [active, setActive] = useState(0);

  // Automatically change the active image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prevActive) => (prevActive + 1) % items.length); // Loop through images
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [items.length]);

  const handleToggle = (index) => setActive(index); // Allow manual toggle

  return (
    <section className="image-accordion">
      {items.map((item, index) => {
        const isActive = active === index ? "active" : "";
        return (
          <div
            key={item.image}
            className={`image-accordion-item ${isActive}`}
            onClick={() => handleToggle(index)}
          >
            <img
              style={{ objectFit: "cover" }}
              src={item.image}
              alt={item.altText || ""}
            />
            <div className="content">
              {/* <span className="material-symbols-outlined">photo_camera</span> */}
              <div>
                <h2>{item.header}</h2>
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
