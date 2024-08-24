import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function FilterComponent() {
    const [filter, setFilter] = React.useState('Date');

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    
    return (
        <FormControl variant="outlined" style={{ minWidth: 120, marginRight: '10px', borderRadius: '10px' }}>
            <InputLabel style={{ color: 'black' }}>Filter</InputLabel>
            <Select
                value={filter}
                onChange={handleChange}
                label="Filter"
                style={{ backgroundColor: '	#cfecf7', color: 'black', borderRadius: '10px' }}
            >
                <MenuItem value="Date">Date</MenuItem>
                <MenuItem value="Location">Location</MenuItem>
            </Select>
        </FormControl>
    );
}

export default FilterComponent;
