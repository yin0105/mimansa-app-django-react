import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { Link } from 'react-router-dom';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& a': {
            // '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: 'white',
        },
        },
    },
}))(MenuItem);

const StyledLink = withStyles((theme) => ({
    root: {
        color: "black",
        // '&:hover': {
        //     textDecoration
        // }
        '&:focus, &:hover, &:visited, &:link, &:active': {
            textDecoration: 'none',
        }
    },
}))(Link);

export default function MainMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    return (
        <div style={{ backgroundColor: "#3f51b5", height: "64px", justifyContent: "center", display: "flex", alignItems: "flex-end", color: "white"}}>
            <Button
                aria-controls="maestros-menu"
                aria-haspopup="true"
                variant="text"
                style={{ color: "white", marginRight: "150px", }}
                onClick={handleClick}
            >
                Maestros
            </Button>
            <StyledMenu
                id="maestros-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <StyledLink to="#">Warehouse</StyledLink>
                </StyledMenuItem>
                <StyledMenuItem>
                    <StyledLink to="#">Location Printer Map</StyledLink>
                </StyledMenuItem>
            </StyledMenu>

            <Button
                aria-controls="packfromtote-menu"
                aria-haspopup="true"
                variant="text"
                style={{ color: "white" }}
                onClick={handleClick2}
            >
                Pack from Tote
            </Button>
            <StyledMenu
                id="packfromtote-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
            >
                <StyledMenuItem>
                    <StyledLink to="#">Pack from Tote</StyledLink>
                </StyledMenuItem>
                <StyledMenuItem>
                    <StyledLink to="/tote_detail">Tote Details</StyledLink>
                </StyledMenuItem>
                <StyledMenuItem>
                    <Link to="/login">Tote Details</Link>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}
