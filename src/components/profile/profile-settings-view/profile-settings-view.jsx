//import
import {Link} from "react-router-dom";

//import react bootstrap
import {Row, Col} from "react-bootstrap";

export const ProfileSettingsView = () => {
    return (
        <>
            <Row>
                <Col>
                    <Link to={`/users/settings/password`}>Change password</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`/users/settings/email`}>Change email address</Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`/users/settings/delete`}>Delete account</Link>
                </Col>
            </Row>
        </>
    )
}