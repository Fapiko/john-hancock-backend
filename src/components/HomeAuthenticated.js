import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import {ROUTE_CA_HOME} from "../consts/routes";

const HomeAuthenticated = (props) => {
    return (
        <>
            <Button variant="contained" color="primary" component={RouterLink} to={ROUTE_CA_HOME}>
                View CAs
            </Button>
        </>
    );
}

export default HomeAuthenticated;
