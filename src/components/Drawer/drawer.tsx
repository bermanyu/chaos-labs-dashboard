import React from "react";
import {
    Drawer,
    ListItem,
    List,
    ListItemText,
    styled, Typography, Tooltip
} from "@mui/material";
import MenuOpen from '@mui/icons-material/MenuOpen';
import AddIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import "./drawer.css"

const DrawerNav = (props: any) => {
    const [openDashboardList, setState]           = React.useState(false);
    const [showInput, setShowInput]               = React.useState(false);
    const [newDashboardName, setNewDashboardName] = React.useState("");
    const [isValidName, setIsValidName]           = React.useState(true);

    const DrawerHeader = styled('div')(({theme}) => ({
        display:      'flex',
        alignItems:   'center',
        padding:      "5px",
        borderBottom: "1px solid #ffffff"
    }));

    const toggleDrawer =
              (open: boolean) =>
                  (event: React.KeyboardEvent | React.MouseEvent) => {
                      if(
                          event.type === 'keydown' &&
                          ((event as React.KeyboardEvent).key === 'Tab' ||
                              (event as React.KeyboardEvent).key === 'Shift')
                      ) {
                          return;
                      }

                      setState(open);
                      setNewDashboardName("")
                      setShowInput(false)
                  };

    const onDashboardClick = (event: any) => {
        setState(false)
        props.ondashboardSelect(event.target.innerText)
    }

    const openInput = () => {
        setShowInput(true)
    }

    const createNewDashboard = () => {
        if(newDashboardName.trim().length > 0) {
            props.onDashboardAdd(newDashboardName);
            setState(false)
            setNewDashboardName("")
        }
        else {
            setIsValidName(false);
        }
    }

    const changeName = (event: any) => {
        event.target.value.trim().length > 0 ? setIsValidName(true) : setIsValidName(false)

        setNewDashboardName(event.target.value)
    }

    return (
        <div>
            <IconButton className="add-icon" onClick={toggleDrawer(true)}><MenuOpen/></IconButton>
            <Drawer open={openDashboardList} sx={{
                width:                280,
                flexShrink:           0,
                '& .MuiDrawer-paper': {
                    background: 'var(--dark-grey)',
                    color:      'white',
                    width:      280,
                    boxSizing:  'border-box'
                },
            }} onClose={toggleDrawer(false)}>
                <DrawerHeader sx={{flexDirection: "column"}}>
                    <div style={{
                        flexDirection:  "row",
                        position:       "sticky",
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "space-between"
                    }}>
                        <Typography flex="1">
                            Dashboards
                        </Typography>

                        {showInput ? null :
                            <Tooltip title="add new dashboard" placement="right" arrow><IconButton onClick={openInput}
                                                                                                   className="add-icon">
                                <AddIcon/>
                            </IconButton></Tooltip>}
                    </div>
                    {showInput ? <input style={{
                        width:           "65%",
                        display:         "flex",
                        alignItems:      "center",
                        color:           "white",
                        border:          "0px",
                        marginTop:       "5px",
                        borderBottom:    "1px solid white",
                        borderColor:     isValidName ? "none" : "red",
                        backgroundColor: isValidName ? "transparent" : "#fa9d9d"
                    }}
                                        autoFocus={true}
                                        placeholder={isValidName ? "Enter Dashboard Name " : "Can't Enter empty name"}
                                        value={newDashboardName} onChange={changeName}/> : null}
                    {showInput ? <IconButton onClick={createNewDashboard} className="add-icon">
                        <AddIcon/>
                    </IconButton> : null}
                </DrawerHeader>
                <List>
                    {props.dashboardList.map((item: { key: any; value: any }, index: any) => {
                        const {
                                  key,
                                  value
                              } = item;
                        return (
                            <ListItem sx={{
                                display:       "flex",
                                flexDirection: "column",
                                alignItems:    "center"
                            }} key={key} value={value} onClick={onDashboardClick}>
                                <ListItemText primary={value}/>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </div>
    );
};

export default DrawerNav;
