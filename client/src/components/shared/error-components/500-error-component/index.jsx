import Container from "../index.styles";

function Error500Component() {
    return (
        <Container>
            <img src="/img/error.svg" alt="error"/>
            <h3 style={{fontSize:"40px", margin: 2}}>500 Server Error</h3>
            <p style={{fontSize:"28px", margin: 2}}>The server encountered an internal error!</p>
        </Container>
    );
}

export default Error500Component;