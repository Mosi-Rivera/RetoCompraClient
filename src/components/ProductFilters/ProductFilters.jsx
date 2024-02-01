import React from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import { useSearchParams } from 'react-router-dom';
const colors = (_colors => _colors.map(_color => ({name: _color.charAt(0).toUpperCase() + _color.slice(1), value: _color.toUpperCase()})))([
  "black",
  "white",
  "red",
  "blue",
  "yellow",
  "purple",
  "orange",
  "green",
  "brown",
  "pink",
  "multi"
]);

const FilterSidebar = ({default_sort = 'new'}) => {
  const [search_params, setSearchParams] = useSearchParams();
  const handleInputChange = (field, value) => {
    setSearchParams(() => {
      const current_params = Object.fromEntries(search_params.entries());
      current_params[field] = value;
      return current_params;
    });
  };

  const handleRemoveFilter = (field) => {
    setSearchParams(() => {
      const current_params = Object.fromEntries(search_params.entries());
      delete current_params[field];
      return current_params;
    });
  };

  const FilterChips = () => (
    <Grid container spacing={1} style={{ marginTop: '10px', minHeight: '40px' }}>
      {Array.from(search_params.entries())
        .filter(([field, value]) => value && field !== 'page')
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
      <div data-testId='product-filters'>
        <div style={{display: 'flex', marginBottom: '10px', maxWidth: '500px'}}>
            <FormControl style={{ flex: '1', marginRight: '10px' }}>
              <InputLabel htmlFor="size">Size</InputLabel>
              <Select
                data-testId='size-select'
                id="size"
                value={search_params.get('size') || ''}
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
                data-testId='color-select'
                id="color"
                value={search_params.get('color') || ''}
                onChange={(e) => handleInputChange('color', e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                variant="outlined"
                size="medium"
                style={{ border: 'none' }}
              >
                {
                  colors.map(({value, name}, i) => <MenuItem key={'color-option-' + i} value={value} sx={{display: 'flex', justifyContent: 'space-between'}}>{name} <span style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: name,
                    border: '1px solid black',
                    marginRight: '5px'
                  }}></span> </MenuItem>)
                }
              </Select>
            </FormControl>

            <FormControl style={{ flex: '1', marginRight: '10px' }}>
              <InputLabel htmlFor="sort">Sort</InputLabel>
              <Select
                data-testId='sort-select'
                id="sort"
                value={search_params.get('sort') || default_sort}
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
