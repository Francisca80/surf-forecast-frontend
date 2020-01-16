import React, { FunctionComponent } from "react";
import { Beachbreak } from "../models/beachbreak";
import { BeachbreakListItem } from "./BeachbreakListItem";
import "../App.css";
import Grid from "@material-ui/core/Grid";
import { List } from "@material-ui/core";

interface Props {
  beachbreaks: Beachbreak[];
  onDelete: (beachbreaks: Beachbreak) => void;
}

export const BeachbreakList: FunctionComponent<Props> = ({
  beachbreaks,
  onDelete
}) => {
  return (
    <Grid item xs={12} md={12}>
      <div className="beachbreakList">
        <List>
          {beachbreaks.map(beachbreak => (
            <BeachbreakListItem
              key={beachbreak.id}
              beachbreak={beachbreak}
              onDelete={onDelete}
            />
          ))}
        </List>
      </div>
    </Grid>
  );
};
