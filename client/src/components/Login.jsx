import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Helvetica;
    background-color: #f0f3f8;
`;

const Logo = styled.img`
    height: 227px;
    width: 225px;
`;

const MessageContainer = styled.div`
    flex-direction: column;
    gap: 10px;
    padding: 30px 0px 30px 0px;
    position: relative;
    width: 760px;
`;

const H3 = styled.h3`
    font-size: 34px;
    font-weight: 500;
    letter-spacing: 0.25px;
    line-height: 42px;
    margin-block-start: 0;
    margin-block-end: 0;
`;

const P = styled.p`
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.15px;
    line-height: 24px;
`;

const InputContainer = styled.div`
    position: relative;
    width: 760px;
    outline-style: outset;
    outline-color: #2f2f2f39;
    outline-width: 0px 1px 5px 1px;
    border-radius: 8px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Input = styled.input`
    border: 1px solid;
    border-color: #0000003b;
    border-radius: 8px;
    padding: 16px;
    width: 90%;
    margin: 16px;
    cursor: pointer;
    &:hover {
        border-color: black;
    }
    ::placeholder {
        color: #00000099;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.15px;
    }
`;

const Button = styled.button`
    background-color: #3568e5;
    color: white;
    border: none;
    font-weight: bold;
    border-radius: 5px;
    padding: 20px;
    width: 760px;
    margin-top: 30px;
    cursor: pointer;
    &:hover {
        background-color: #284ba2;
    }
`;

function Login() {
    return (
        <Container>
            <Logo src="./img/tcesLogo.svg" alt="TCES Logo" />
            <MessageContainer>
                <H3>Welcome back to TCES!</H3>
                <P>Log in below with your details.</P>
            </MessageContainer>
            <InputContainer>
                <Input placeholder="TCES Email" name="tces email" />
                <Input placeholder="Password" name="password" />
            </InputContainer>
            <Button>LOG IN</Button>
        </Container>
    );
}

export default Login;
