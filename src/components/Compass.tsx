import React, { FunctionComponent } from "react";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

interface Props {
    degrees: number | undefined;

}
export const Compass: FunctionComponent<Props> = (props: Props) => {
    const circumference = 2 * Math.PI * 30;
    const { degrees } = props;

    return (
        <React.Fragment>
            <div style={{ 
                marginRight: "60px", 
                borderRadius: circumference, 
                backgroundColor: "rgb(45, 155, 136)", 
                width: 45, 
                height: 45,
                boxShadow: "inset 0 0 8px 0.1px rgb(36, 129, 114)"
                }}>
                <div style={{
                    transform: `rotate(${degrees}deg)`, 
                    color: "white",
                    width: "45px",
                    height: "45px",
                    textAlign: "center", display: "flex"
                    
                }}>
                    <ArrowUpwardIcon style={{ margin: "auto" }} />
                </div>

            </div>


        </React.Fragment >
    )
}