import React, { FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import { Beachbreak } from "../models/beachbreak";
import { TextField } from "@material-ui/core";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (event: React.FormEvent<HTMLFormElement>) => void;
  beachbreak: Beachbreak;
}

export const NewBeachbreakForm: FunctionComponent<Props> = ({
  onChange,
  onAdd,
  beachbreak
}) => (
  <div className="addBeachbreak">
    <form onSubmit={onAdd}>
      <TextField
        id="outlined-size-small"
        label="Beach"
        variant="outlined"
        size="small"
        onChange={onChange}
        value={beachbreak.name}
      />
      <Button
        className="goRight"
        variant="contained"
        color="primary"
        aria-label="add"
        size="medium"
        type="submit"
      >
        Add
      </Button>
    </form>
  </div>
);
