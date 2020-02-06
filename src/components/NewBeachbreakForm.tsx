import React, { FunctionComponent } from "react";

import { TextField } from "@material-ui/core";

import { Beachbreak } from "../models/beachbreak";
import { StyledFabAddBeach, StyledIconAddBeach } from "../shared/StyledComponents";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (event: React.FormEvent<HTMLFormElement>) => void;
  beachbreak: Beachbreak;
}

export const NewBeachbreakForm: FunctionComponent<Props> = ({
  onChange,
  onAdd
}) => {
  return (
    <div style={{ margin: "0 auto", marginBottom: "50px", width: "fit-content" }}>
      <form onSubmit={onAdd}>
        <TextField onChange={onChange}  id="beachbreak" label="Find beach" />
        <StyledFabAddBeach color="primary" aria-label="add" type="submit" className="styled-fab">
          <StyledIconAddBeach />
        </StyledFabAddBeach>
      </form>
    </div>
  )
};

