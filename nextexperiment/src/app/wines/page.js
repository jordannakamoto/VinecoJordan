'use client'
import React, { useState, useEffect } from 'react';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useSort } from '@table-library/react-table-library/sort';
import supabase from '../../supabase/supabase.js'; // Adjust the path based on your directory structure
import Navbar from '../../components/navbar.js'; // Adjust the path based on

const WinesTable = () => {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const { data, error } = await supabase.from('wine').select();
        if (error) throw error;
        setWines(data);
      } catch (error) {
        console.error('Error fetching wines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, []);

  const theme = useTheme(getTheme());

  const sort = useSort(
    wines,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.winename.trim().localeCompare(b.winename.trim())),
        YEAR: (array) => array.sort((a, b) => a.vintageyear - b.vintageyear),
        PRODUCER: (array) => array.sort((a, b) => a.producer.trim().localeCompare(b.producer.trim())),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    {
      label: 'Name',
      renderCell: (item) => item.winename,
      sort: { sortKey: 'NAME' },
    },
    {
      label: 'Year',
      renderCell: (item) => item.vintageyear,
      sort: { sortKey: 'YEAR' },
    },
    {
      label: 'Type',
      renderCell: (item) => item.producer,
      sort: { sortKey: 'PRODUCER' },
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Supabase Wine Data</h1>
        
        {/* Search Bar */}
        <input
          type="text"
          className="p-2 border rounded mb-4"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CompactTable 
            columns={COLUMNS} 
            data={{ nodes: wines.filter((wine) =>
              JSON.stringify(wine).toLowerCase().includes(searchTerm.toLowerCase())
            )}} 
            theme={theme} 
            sort={sort} 
          />
        )}
      </div>
    </>
  );
};

export default WinesTable;
