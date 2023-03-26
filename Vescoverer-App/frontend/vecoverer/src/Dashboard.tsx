import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import Badge from '@mui/material/Badge';
import "./Dashboard.css";
import { Typography } from '@mui/material';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {display} from "@mui/system"



interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  

const Dashboard = () => {

    const [value, setValue] = useState(0);
    const [badgeCount, setBadgeCount] = useState(0)
    const [hasClickedBadge, setHasClickedBadge] = useState(false)
    const childRef = useRef<HTMLInputElement>(null);
    const [address, setAddress] = useState("")
    const [update, setUpdate] = useState(false)
    const [result, setResult] = useState(null) 
    const [isVerified, setIsVerfied] = useState(null)
    const [account, setUserAccount] = useState({}) 

    const addBadgeCount = () => {
        setBadgeCount(prev => prev + 1)
    }

    const resetBadge = () => {

      setBadgeCount(0)

    }

  
      const uploadClick = (event: React.MouseEvent<HTMLImageElement>) => {

      event.preventDefault()
      childRef.current?.click();
  }

  const handleChange = ((e: React.SyntheticEvent<Element,Event>, newValue: any) => {
        setValue(newValue);
  }) ;



    return (
        <div className="dashboard-outer">
        <div className="dashboard-middle">
            <div className="dashboard-inner" style={{
                marginBottom : "20px"
            }}>

                <Paper square>
                <Tabs
                variant='fullWidth'
                value={value}
                textColor="inherit"
                onChange={handleChange}
                aria-label="disabled tabs example"
                //classes={{
                 ///   root: classes.customRoot,
                 //   indicator: classes.customTabIndicator
                //}}
        
                >
                <Tab label="Account"  icon={<AccountBoxIcon /> } {...a11yProps(0)} />
                <Tab label="Verify" icon={<DoneOutlineOutlinedIcon />} {...a11yProps(1)} />
                <Tab label="Vescover" icon={<ExploreOutlinedIcon />} {...a11yProps(2)} />
                <Tab label="Vescovered"  icon={
                
                <Badge badgeContent={badgeCount} sx={{
                    "& .MuiBadge-badge": {
                    color: "white",
                    backgroundColor: "#3797A4"
                    }}}> 
                    <FolderOpenOutlinedIcon/> 

                    </Badge>} {...a11yProps(3)} 
                />  
                <Tab label="Recipes" icon={<FormatListBulletedOutlinedIcon /> } {...a11yProps(4)} />
                </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                   
                </TabPanel>
                <TabPanel value={value} index={1}>
                  
                </TabPanel>
                <TabPanel value={value} index={2}>
                  
                </TabPanel>
                <TabPanel value={value} index={3}>
                  
                </TabPanel>
                <TabPanel value={value} index={4}>
                   
                </TabPanel>

            </div>

        </div>

    </div>
  

    );
}

export default Dashboard;