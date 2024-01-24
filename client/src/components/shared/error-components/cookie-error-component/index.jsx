import Container from "../index.styles";

function CookieErrorComponent() {
    return (
        <Container>
            <img src="/img/error.svg" alt="error"/>
            <h3 style={{fontSize:"40px", margin: 2}}>Invalid Cookie Error!</h3>
        </Container>
    );
}

export default CookieErrorComponent;