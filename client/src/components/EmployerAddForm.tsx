import { Typography, Card, CardContent, Grid, TextField, Button, Box, 
    FormHelperText, FormControl, InputLabel, Select, MenuItem, Pagination} from "@mui/material";
    
    
    function EpmployerAddForm() {
        return (
            <div>
            
            <Box style={{maxWidth:750, margin:"auto", padding:"20px 30px", backgroundColor:"#f4f6f9"}}>
                <CardContent> 
                  <Typography marginBottom={1} variant="h4" align="left">Adding a New Employer</Typography>
                  <Typography marginBottom={4} variant="body2" component="p" align="left">Input information about the employer that you are adding.</Typography>
                  
                  <Card sx={{ width: '100%', bgcolor: 'background.paper', border: 3, borderColor: 'primary.main'}}>
                    <Box style={{borderStyle:"dashed", borderWidth:"0 0 1.8px 0"}} borderColor="primary.main" width="100%" paddingTop={1} paddingLeft={1.5}>
                    <Typography gutterBottom variant="h6" align="left">Company Information</Typography>
                    </Box>
                    <CardContent>
    
                    <form>
                        <Grid container spacing={1}>
                            <Grid xs={12} item>
                            <TextField label="Business Name" placeholder="Enter business name" variant="outlined" fullWidth/>
                            {/* <Typography margin={0.5} fontSize={11}align="left" color="text.secondary">*Required</Typography> */}
                            <FormHelperText>*Required</FormHelperText>
                            </Grid>
    
                            <Grid xs={12} item>
                            <TextField label="Business Legal Name" placeholder="Enter business legal name" variant="outlined" fullWidth/>
                            </Grid>
    
                            <Grid xs={12} sm={6} item>
                            <TextField type="number" label="Phone Number" placeholder="Enter phone number" variant="outlined" fullWidth/>
                            <FormHelperText>*Required</FormHelperText>
                            </Grid>
    
                            <Grid xs={12} sm={6} item>
                            <TextField type="number" label="Fax Number" placeholder="Enter fax number" variant="outlined" fullWidth/>
                            </Grid>
    
                            <Grid xs={12} sm={6} item>
                            <TextField type="email" label="General Email" placeholder="Enter general email" variant="outlined" fullWidth/>
                            <FormHelperText>*Required</FormHelperText>
                            </Grid>
    
                            <Grid xs={12} sm={6} item>
                            <TextField type="url" label="Website" placeholder="Enter website" variant="outlined" fullWidth/>
                            </Grid>
    
                            <Grid xs={12} item>
                            <TextField type="text" label="Employer Address" placeholder="Enter employer address" variant="outlined" fullWidth/>
                            <FormHelperText>*Required</FormHelperText>
                            </Grid>
    
                            <Grid xs={12} item>
                            <TextField type="text" label="City" placeholder="Enter city" variant="outlined" fullWidth/>
                            <FormHelperText>*Required</FormHelperText>
                            </Grid>
    
                            <Grid xs={12} sm={6} item>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel>Province</InputLabel>
                                    <Select label="Province">
                                        <MenuItem value={1}>Alberta</MenuItem>
                                        <MenuItem value={2}>British Columbia</MenuItem>
                                        <MenuItem value={3}>Manitoba</MenuItem>
                                        <MenuItem value={4}>New Brunswick</MenuItem>
                                        <MenuItem value={5}>Newfoundland and Labrador</MenuItem>
                                        <MenuItem value={6}>Northwest Territories</MenuItem>
                                        <MenuItem value={7}>Nova Scotia</MenuItem>
                                        <MenuItem value={8}>Nunavut</MenuItem>
                                        <MenuItem value={9}>Ontario</MenuItem>
                                        <MenuItem value={10}>Prince Edward Island</MenuItem>
                                        <MenuItem value={11}>Quebec</MenuItem>
                                        <MenuItem value={12}>Saskatchewan</MenuItem>
                                        <MenuItem value={13}>Yukon</MenuItem>
                                    </Select>
                                    <FormHelperText>*Required</FormHelperText>
                                </FormControl>
                            </Grid>
    
                            <Grid xs={12} sm={6} item>
                            <TextField label="Postal Code" placeholder="Enter postal code" variant="outlined" fullWidth/>
                            <FormHelperText>*Required</FormHelperText>
                            </Grid>
                        </Grid>
                    </form>
                    </CardContent>
                  </Card>
    
                {/* Add Seconday Address Button */}
                <Grid xs={12} item marginTop={5}>
                    <Box border='2px dashed' borderRadius="10px" borderColor="#5d86e9" width="100%">
                        <Button sx={{color:"#5d86e9", backgroundColor: '#dce5f7', textTransform: "none", fontWeight:"550", fontSize:"16px"}} fullWidth type="submit">+ Add Secondary Address</Button>
                    </Box>
                </Grid>
                <Grid margin={3} display="flex" justifyContent="center">
                <Pagination count={3} variant="text" shape="rounded" color="primary"/>   
                </Grid>
                
                {/* Discard and Next Buttons */}
                <Grid marginTop={3} sx={{ display:"flex", justifyContent: 'space-between' }}>
                <Button variant="outlined" sx={{fontSize:"12px"}}>Discard</Button>
                <Button variant="contained" sx={{fontSize:"12px"}}>Next</Button>
                </Grid>
                </CardContent>
            </Box>
            </div>
        );
    
    }
    
export default EpmployerAddForm;