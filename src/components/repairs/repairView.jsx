import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import Kent from '../../assets/images/All Logos/kent logo.webp';
import Nasaka from '../../assets/images/All Logos/nasaka.webp';
import Pureit from '../../assets/images/All Logos/unilever pure.webp';
import RkAqua from '../../assets/images/BrandLogos/rkAqua.jpg';
import TataSwach from '../../assets/images/All Logos/tata swach.webp';
import Nexus from '../../assets/images/All Logos/nexus.webp';
import Philips from '../../assets/images/All Logos/philips logo.webp';
import Mi from '../../assets/images/All Logos/mi.webp';
import AquaSmart from '../../assets/images/All Logos/aqua smart.webp';
import BlueStar from '../../assets/images/All Logos/blue star.webp';
import Live from '../../assets/images/All Logos/livpure logo.webp';

function RepairView() {
  const brandLogos = [
    { id: 1, src: Kent, name: 'Kent' },
    { id: 2, src: Pureit, name: 'Pureit' },
    { id: 3, src: AquaSmart, name: 'AquaSmart' },
    { id: 4, src: Live, name: 'Live' },
    { id: 6, src: BlueStar, name: 'BlueStar' },
    { id: 7, src: RkAqua, name: 'RkAqua' },
    { id: 8, src: Nasaka, name: 'Nasaka' },
    { id: 9, src: TataSwach, name: 'TataSwach' },
    { id: 10, src: Nexus, name: 'Nexus' },
    { id: 12, src: Mi, name: 'Mi' },
  ];

  // Group brands by category (you can adjust the categories as needed)
  const brandCategories = {
    'Water Purifiers': ['Kent', 'Pureit', 'RkAqua', 'Nasaka', 'TataSwach', 'Nexus'],
    'Home Appliances': ['LG', 'Samsung', 'Panasonic', 'Marq', 'Whirlpool', 'Haier', 'Siemens', 'Bosch', 'Mi', 'Llyod', 'Philips', 'Toshiba']
  };

  const [showAllBrands, setShowAllBrands] = useState(false);

  const handleToggleBrands = () => {
    setShowAllBrands(!showAllBrands);
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: '16px',
        padding: { xs: '20px 15px', md: '30px 30px' },
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        position: 'relative',
        my: 5
      }}
    >
      {/* Decorative background elements */}
      <Box sx={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(71, 66, 124, 0.1)',
        zIndex: 0
      }} />

      <Box sx={{
        position: 'absolute',
        bottom: '-70px',
        left: '-70px',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'rgba(71, 66, 124, 0.05)',
        zIndex: 0
      }} />

      <Container maxWidth="xl">
        {/* Header Section */}
        <Box mb={4} position="relative" zIndex={1} textAlign={{ xs: 'center', md: 'left' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '26px', sm: '40px', md: '48px' },
              color: '#47427C',
              marginBottom: '16px',
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                right: { xs: 0, md: 'auto' },
                mx: { xs: 'auto', md: 0 },
                width: '80px',
                height: '4px',
                backgroundColor: '#47427C',
                borderRadius: '2px'
              }
            }}
          >
            Top Brands We Repair
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#555',
              maxWidth: '800px',
              mx: { xs: 'auto', md: 0 },
              fontSize: { xs: '16px', md: '18px' }
            }}
          >
            No matter where you bought it, we can fix it. We repair most major brands, makes, and models.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {brandLogos.map((brand) => (
            <Grid
              item
              xs={6} sm={4} md={3} lg={2}
              key={brand.id}
              sx={{
                display: (!showAllBrands && brand.id > 7) ? { xs: 'none', sm: 'block' } : 'block'
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  position: 'relative',
                  zIndex: '1',
                  overflow: 'hidden',
                  height: { xs: '100px', md: '140px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'flex-start', md: 'center', lg: 'center' },
                  flexDirection: 'column',
                  padding: '5px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(71, 66, 124, 0.15)',
                    border: '2px solid #47427C'
                  }
                }}
              >
                <Box
                  component="img"
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  sx={{
                    maxWidth: '85%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* "View All" button - only visible on mobile */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: 4, 
          mb: 2, 
          display: { xs: 'block', sm: 'none' } 
        }}>
          <Button
            onClick={handleToggleBrands}
            sx={{
              backgroundColor: '#59168b',
              color: 'white',
              padding: '8px 16px',
              fontWeight: 500,
              borderRadius: '12px',
              border: '1px solid #3d3969',
              '&:hover': {
                backgroundColor: 'lightgreen',
                border:'white'
              }
            }}
          >
            {showAllBrands ? "Show Less Brands" : "View All Brands"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default RepairView;