import { Backdrop, colors } from "@mui/material";
// import { Grid, Bars } from "react-loader-spinner";

export default function Loading(){
    return(
        <Backdrop sx={{zIndex: 10000000}} open>
            {/* <Bars color={colors.orange[400]} /> */}
        </Backdrop>
    )
}