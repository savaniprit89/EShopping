import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "./redux/apiCalls";
import { mobile } from "./Responsive";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({width:"75%"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction:column ;
`;

const Input = styled.input`
flex:2;
  min-width: 20%;
  display:flex ;
  align-items:center ;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  ${mobile({margin:"9px 4px 0px 0px ",padding: "10px"})} 
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Label=styled.label` 
flex:1 ;
display:flex ;
margin: 20px 10px 0px 0px;
align-items:center ;
${mobile({margin:"9px 4px 0px 0px ",padding: "10px"})} 
`
const Addinput=styled.div` 
display:flex ;
justify-content:space-around ;
`
const Register = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
   
  };

  const handleclick=async(e)=>{
    e.preventDefault();
    try {
      let url=" "
     if(file){
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dhzh0vxzv/image/upload",
            data
          );

         
          url = uploadRes.data.url;
      
          }
      const info = { ...inputs, img:url};
      console.log(info)
      register(dispatch,info).then(()=>{
        navigate("/");
      })
    
    } catch (err)
     {
        console.log(err)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
        <Addinput>
        <Label>Profile pic</Label>
        <Input type="file" id="file" required onChange={(e) => setFile(e.target.files[0])}/>
        </Addinput>
        <Addinput> <Label>email</Label> <Input placeholder="email" name="email" type="text" required  onChange={handleChange} /></Addinput>
        <Addinput> <Label>username</Label> <Input placeholder="username" name="username" type="text" required  onChange={handleChange}/></Addinput>
       
        <Addinput><Label>name</Label> <Input placeholder="name" name="name" type="text" required  onChange={handleChange}/></Addinput>
        <Addinput><Label>lastname</Label> <Input placeholder="lastname" name="lastname" type="text" required   onChange={handleChange} /></Addinput>
      
        <Addinput><Label>password</Label> <Input placeholder="password" type='password' name="password" required  onChange={handleChange} /></Addinput>
        <Addinput> <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement></Addinput>
          <Addinput><Button onClick={handleclick}>CREATE</Button></Addinput>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;