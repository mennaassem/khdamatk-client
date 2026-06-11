import React, { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  Stack,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { proposalsApi } from '../services/api';
import { Proposal } from '../types';

interface SubmitProposalFormData {
  bidAmount: number;
  bidDuration: string;
  coverLetter: string;
  experienceLevel: string;
  agreeToTerms: boolean;
}

const SubmitProposalPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { control, handleSubmit, formState: { errors } } = useForm<SubmitProposalFormData>({
    defaultValues: {
      bidAmount: 0,
      bidDuration: '',
      coverLetter: '',
      experienceLevel: '',
      agreeToTerms: false,
    },
  });

  const steps = ['Cover Letter', 'Pricing', 'Review & Submit'];

  const onSubmit = async (data: SubmitProposalFormData) => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
      return;
    }

    if (!data.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const proposalData: Partial<Proposal> = {
        jobId: jobId,
        bidAmount: data.bidAmount,
        bidDuration: data.bidDuration,
        coverLetter: data.coverLetter,
        experienceLevel: data.experienceLevel,
      };

      await proposalsApi.create(proposalData);
      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        navigate('/jobs');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit proposal');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
        <Card sx={{ width: '100%', p: 3, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 64, color: '#4CAF50', mb: 2 }} />
          <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 'bold', mb: 2 }}>
            Proposal Submitted Successfully!
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 3 }}>
            Your proposal has been sent to the client. We'll notify you when they respond.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/jobs')}>
            Back to Jobs
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1a1a1a' }}>
          Apply To: Social Media Specialist /Remotely
        </Typography>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Form Content */}
      <Card sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Cover Letter */}
          {activeStep === 0 && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Your Message</Typography>
                <Controller
                  name="coverLetter"
                  control={control}
                  rules={{ required: 'Cover letter is required', minLength: { value: 50, message: 'Minimum 50 characters' } }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={6}
                      placeholder="Write a message to the client about why you're a great fit for this project..."
                      error={!!errors.coverLetter}
                      helperText={errors.coverLetter?.message}
                    />
                  )}
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                Ask the service provider anything you want to know about this service. Posting external contact information is prohibited.
              </Typography>
            </Stack>
          )}

          {/* Step 2: Pricing */}
          {activeStep === 1 && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Set Your Price</Typography>
                <Controller
                  name="bidAmount"
                  control={control}
                  rules={{ required: 'Price is required', min: { value: 1, message: 'Price must be greater than 0' } }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="Price"
                      InputProps={{ startAdornment: <InputAdornment position="start">EGP</InputAdornment> }}
                      error={!!errors.bidAmount}
                      helperText={errors.bidAmount?.message}
                    />
                  )}
                />
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Delivery Time</Typography>
                <Controller
                  name="bidDuration"
                  control={control}
                  rules={{ required: 'Delivery time is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.bidDuration}>
                      <InputLabel>Select Delivery Time</InputLabel>
                      <Select {...field} label="Select Delivery Time">
                        <MenuItem value="3 days">3 Days</MenuItem>
                        <MenuItem value="1 week">1 Week</MenuItem>
                        <MenuItem value="2 weeks">2 Weeks</MenuItem>
                        <MenuItem value="1 month">1 Month</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Experience Level</Typography>
                <Controller
                  name="experienceLevel"
                  control={control}
                  rules={{ required: 'Experience level is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.experienceLevel}>
                      <InputLabel>Select Experience Level</InputLabel>
                      <Select {...field} label="Select Experience Level">
                        <MenuItem value="beginner">Beginner</MenuItem>
                        <MenuItem value="intermediate">Intermediate</MenuItem>
                        <MenuItem value="expert">Expert</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>
            </Stack>
          )}

          {/* Step 3: Review */}
          {activeStep === 2 && (
            <Stack spacing={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Review Your Proposal</Typography>

              <Card sx={{ backgroundColor: '#f9f9f9', p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">Price</Typography>
                    <Typography variant="h6" sx={{ color: '#7C3AED', fontWeight: 'bold' }}>
                      EGP {control._formValues.bidAmount}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">Delivery Time</Typography>
                    <Typography variant="body2">{control._formValues.bidDuration}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">Experience Level</Typography>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {control._formValues.experienceLevel}
                    </Typography>
                  </Box>
                </Stack>
              </Card>

              <Controller
                name="agreeToTerms"
                control={control}
                rules={{ required: 'You must agree to the terms' }}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Checkbox />}
                    label="I have reviewed the terms and conditions of the KHADMA website and this message does not violate them in any way."
                  />
                )}
              />
            </Stack>
          )}

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button variant="outlined" onClick={handleBack} fullWidth>
              {activeStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              fullWidth
              sx={{ backgroundColor: '#7C3AED' }}
            >
              {loading ? <CircularProgress size={24} /> : activeStep === steps.length - 1 ? 'Send' : 'Next'}
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default SubmitProposalPage;
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Experience Level
                  </Typography>
                  <Controller
                    name="experienceLevel"
                    control={control}
                    rules={{ required: 'Experience level is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        select
                        SelectProps={{
                          native: true,
                        }}
                        variant="outlined"
                        error={!!errors.experienceLevel}
                        helperText={errors.experienceLevel?.message}
                      >
                        <option value="">Select your experience level</option>
                        <option value="Entry">Entry Level</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                      </TextField>
                    )}
                  />
                </Box>
              </Stack>
            )}

            {activeStep === 1 && (
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Your Bid Amount
                  </Typography>
                  <Controller
                    name="bidAmount"
                    control={control}
                    rules={{
                      required: 'Bid amount is required',
                      min: { value: 0, message: 'Bid amount must be positive' },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                        variant="outlined"
                        error={!!errors.bidAmount}
                        helperText={errors.bidAmount?.message}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    )}
                  />
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                    This is the total amount you're asking for this project
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    How long will this project take?
                  </Typography>
                  <Controller
                    name="bidDuration"
                    control={control}
                    rules={{ required: 'Duration is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        select
                        SelectProps={{
                          native: true,
                        }}
                        variant="outlined"
                        error={!!errors.bidDuration}
                        helperText={errors.bidDuration?.message}
                      >
                        <option value="">Select duration</option>
                        <option value="1-2 weeks">1-2 weeks</option>
                        <option value="2-4 weeks">2-4 weeks</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                      </TextField>
                    )}
                  />
                </Box>
              </Stack>
            )}

            {activeStep === 2 && (
              <Stack spacing={3}>
                <Box sx={{ backgroundColor: '#F3F0FF', p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Review Your Proposal
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Bid Amount:</Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        ${control._formValues.bidAmount}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Duration:</Typography>
                      <Typography variant="subtitle2">{control._formValues.bidDuration}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="textSecondary">Experience Level:</Typography>
                      <Typography variant="subtitle2">{control._formValues.experienceLevel}</Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Cover Letter:
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: '#F5F5F5',
                      p: 2,
                      borderRadius: 1,
                      minHeight: 100,
                    }}
                  >
                    <Typography variant="body2">{control._formValues.coverLetter}</Typography>
                  </Box>
                </Box>

                <Controller
                  name="agreeToTerms"
                  control={control}
                  rules={{ required: 'You must agree to the terms' }}
                  render={({ field }) => (
                    <FormControlLabel
                      {...field}
                      control={<Checkbox />}
                      label={
                        <Typography variant="body2">
                          I have reviewed the terms and conditions and this message does not contain
                          any external contact information
                        </Typography>
                      }
                      error={!!errors.agreeToTerms}
                    />
                  )}
                />
              </Stack>
            )}
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              if (activeStep > 0) {
                setActiveStep((prev) => prev - 1);
              }
            }}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : activeStep === steps.length - 1 ? (
              'Send Proposal'
            ) : (
              'Next'
            )}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SubmitProposalPage;
