import Container from "../index.styles";

function Error404 () {
    return (
        <Container>
            <img src="/img/error.svg" alt="error"/>
            <h3 style={{fontSize:"40px", margin: 2}}>Error 404</h3>
            <p style={{fontSize:"28px", margin: 2}}>This page doesn&#39;t exist!</p>
        </Container>
    );
}

export default Error404;