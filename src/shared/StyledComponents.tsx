import {
    Fab,
    Paper,
    List,
    withStyles
} from '@material-ui/core';

import VideocamIcon from '@material-ui/icons/Videocam';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';

export const StyledFab = withStyles({
    root: {
        backgroundColor: 'white',
        marginLeft: '10px'
    }
})(Fab);

export const StyledFabAddBeach = withStyles({
    root: {
        backgroundColor: 'white',
    }
})(Fab);

export const StyledIcon = withStyles({
    root: {
        color: 'rgb(45, 155, 136)'
    }
})(ClearIcon);

export const StyledIconAddBeach = withStyles({
    root: {
        color: 'rgb(45, 155, 136)'
    }
})(AddIcon);

export const StyledCamIcon = withStyles({
    root: {
        color: 'rgb(45, 155, 136)'
    }
})(VideocamIcon);

export const StyledPaper = withStyles({
    root: {
        height: '30px'
    }
})(Paper);

export const StyledList = withStyles({
    root: {
        width: '100%',
        maxWidth: 650,
        backgroundColor: "white",
        margin: "0 auto",
        marginBottom: "30px",
        marginTop: "20px",
        borderRadius: "5px"
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    }
})(List);