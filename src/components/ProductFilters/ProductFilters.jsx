import React from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';

const FilterSidebar = ({ filter_state, setFilterState }) => {
  const handleInputChange = (field, value) => {
    setFilterState((prevFilterState) => ({ ...prevFilterState, [field]: value }));
  };

  const handleRemoveFilter = (field) => {
    setFilterState((prevFilterState) => ({ ...prevFilterState, [field]: '' }));
  };

  const FilterChips = () => (
    <Grid container spacing={1} style={{ marginTop: '10px', minHeight: '40px' }}>
      {Object.entries(filter_state)
        .filter(([field, value]) => value)
        .map(([field, value]) => (
          <Grid item key={field}>
            <Chip
              label={`${field.charAt(0).toUpperCase()}${field.slice(1)}: ${value}`}
              onDelete={() => handleRemoveFilter(field)}
            />
          </Grid>
        ))}
    </Grid>
  );

  return (
      <div >
        <div style={{display: 'flex', marginBottom: '10px', maxWidth: '500px'}}>
            <FormControl style={{ flex: '1', marginRight: '10px' }}>
              <InputLabel htmlFor="size">Size</InputLabel>
              <Select
                id="size"
                value={filter_state.size || ''}
                onChange={(e) => handleInputChange('size', e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                variant="outlined"
                size='medium'
                style={{ border: 'none' }}
              >
                <MenuItem value="XS">XS</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ flex: '1', marginRight: '10px' }}>
              <InputLabel htmlFor="color">Color</InputLabel>
              <Select
                id="color"
                value={filter_state.color || ''}
                onChange={(e) => handleInputChange('color', e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                variant="outlined"
                size="medium"
                style={{ border: 'none' }}
              >
                <MenuItem value="black">Black</MenuItem>
                <MenuItem value="white">White</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ flex: '1', marginRight: '10px' }}>
              <InputLabel htmlFor="sort">Sort</InputLabel>
              <Select
                id="sort"
                value={filter_state.sort}
                onChange={(e) => handleInputChange('sort', e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                variant="outlined"
                size="medium"
                style={{ border: 'none' }}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="popular">Popular</MenuItem>
                <MenuItem value="new">New</MenuItem>
              </Select>
            </FormControl>

        </div>
        <FilterChips />
      </div>
  );
};

export default FilterSidebar;
