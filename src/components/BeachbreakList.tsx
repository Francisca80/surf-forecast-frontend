import React, { FunctionComponent } from "react";
import { Beachbreak } from "../models/beachbreak";
import { BeachbreakListItem } from "./BeachbreakListItem";
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    beachbreaks: Beachbreak[];
    onDelete: (beachbreaks: Beachbreak) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 550,
    backgroundColor: theme.palette.background.paper,
    margin: "0 auto",
    marginBottom: "30px",
    marginTop: "20px"
  },
}));



export const BeachbreakList: FunctionComponent<Props> = ({ beachbreaks, onDelete }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <List>
            {beachbreaks.map(beachbreak => (
                <BeachbreakListItem key={beachbreak.id} beachbreak={beachbreak} onDelete={onDelete} />
                
            ))}
        </List>
        </div>
    );
};
