import React, { FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import { Beachbreak } from "../models/beachbreak";


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
      <input onChange={onChange} value={beachbreak.name} />
      <Button variant="contained" color="primary" type="submit" >
        Add Beachbreak
      </Button>
   
    </form>
    </div>

);
