import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton, Popper, ClickAwayListener, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';


const SearchBar = ({ monthOptions, destinationOptions, onSearch, onFilterChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState([]);

    const handleSearchClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setOpen((prev) => !prev);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);  // Call parent search handler
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
            {/* Main Search Bar */}
            <TextField
                placeholder="Search..."
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: '30px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
            />

                
        </Box>
    );

    const handleFilterChange = (type, value) => {
        let newSelection;
        if (type === 'month') {
            newSelection = selectedMonth.includes(value)
                ? selectedMonth.filter((item) => item !== value)
                : [...selectedMonth, value];
            setSelectedMonth(newSelection);
        } else if (type === 'destination') {
            newSelection = selectedDestination.includes(value)
                ? selectedDestination.filter((item) => item !== value)
                : [...selectedDestination, value];
            setSelectedDestination(newSelection);
        }

        // Call parent filter handler
        onFilterChange({ selectedMonth, selectedDestination });
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
                {/* Main Search Bar */}
                <TextField
                    placeholder="Search..."
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onClick={handleSearchClick}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <FilterListIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: '30px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    }}
                />

                {/* Dropdown Content */}
                <Popper open={open} anchorEl={anchorEl} placement="bottom-start" sx={{ zIndex: 1300 }}>
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '15px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                            padding: 2,
                            width: '300px',
                            mt: 1,
                        }}
                    >
                        <FormGroup>
                            <Box sx={{ mb: 2 }}>
                                <strong>Filter by Month:</strong>
                                {monthOptions.map((month, index) => (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                checked={selectedMonth.includes(month)}
                                                onChange={() => handleFilterChange('month', month)}
                                            />
                                        }
                                        label={month}
                                    />
                                ))}
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <strong>Filter by Destination:</strong>
                                {destinationOptions.map((destination, index) => (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                checked={selectedDestination.includes(destination)}
                                                onChange={() => handleFilterChange('destination', destination)}
                                            />
                                        }
                                        label={destination}
                                    />
                                ))}
                            </Box>
                            <Button variant="contained" fullWidth onClick={handleClickAway}>
                                Apply Filters
                            </Button>
                        </FormGroup>
                    </Box>
                </Popper>
            </Box>
        </ClickAwayListener>
    );
};

export default SearchBar;