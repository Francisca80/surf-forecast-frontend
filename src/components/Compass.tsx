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
                boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)" 
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