import React, { FunctionComponent } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import { Beachbreak } from "../models/beachbreak";
import { TextField, withStyles } from "@material-ui/core";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (event: React.FormEvent<HTMLFormElement>) => void;
  beachbreak: Beachbreak;
}

const StyledFab = withStyles({
  root: {
    backgroundColor: 'white',
  },
  // colorInherit: {backgroundColor: 'white'}
})(Fab);

const StyledIcon = withStyles({
  root: {
    color: 'rgb(45, 155, 136)'
  }
})(AddIcon);

export const NewBeachbreakForm: FunctionComponent<Props> = ({
  onChange,
  onAdd,
  beachbreak
}) => {
  
  return (
    <div style={{ margin: "0 auto", width: "fit-content" }}>
      <form onSubmit={onAdd}>
        <TextField onChange={onChange}  id="beachbreak" label="Standard" />
        {/* <Button variant="contained" color="primary" type="submit">
        Add Beachbreak
      </Button> */}
        <StyledFab color="primary" aria-label="add" type="submit" className="styled-fab">
          <StyledIcon />
        </StyledFab>
      </form>
    </div>
  )
};

