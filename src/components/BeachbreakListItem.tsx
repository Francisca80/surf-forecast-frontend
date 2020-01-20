import React, { FunctionComponent } from "react";
import "../App.css";
import { Beachbreak } from "../models/beachbreak";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";

import WavesIcon from "@material-ui/icons/Waves";
import { IconButton, ListItemText, ListItemIcon } from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export interface Props {
  beachbreak: Beachbreak;
  
  onDelete: (beachbreak: Beachbreak) => void;
}

export const BeachbreakListItem: FunctionComponent<Props> = ({
  beachbreak,
  onDelete
}) => {
  const deleteBeach = () => {
    onDelete(beachbreak);
  };

  return (
    <ListItem button onClick={() => { console.log(beachbreak.latitude, beachbreak.longitude) }} >
      <ListItemIcon>
        <WavesIcon />
      </ListItemIcon>
      <ListItemText primary={beachbreak.name} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={deleteBeach}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
