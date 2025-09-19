import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Box,
  Flex,
  Spinner,
  Center,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { appConfig } from '../../constants.ts'
import type { FormEvent } from 'react'
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'

export function Login() {
  const { t } = useTranslation()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState('')

  const validateEmail = (value: string) => {
    if (!value) {
      return { valid: false, error: t('login_email_required') }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { valid: false, error: t('login_invalid_email') }
    }
    return { valid: true, error: '' }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
  }

  const handleEmailBlur = () => {
    const emailCheck = validateEmail(email)
    if (!emailCheck.valid) {
      setEmailError(emailCheck.error)
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const emailCheck = validateEmail(email)
    if (!emailCheck.valid) {
      setEmailError(emailCheck.error)
      return
    }

    setIsSubmitting(true)
    setIsSuccess(false)
    setIsError('')

    const response = await fetch(`${appConfig.apiURL}auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })

    if (response.status === 200) {
      setIsSuccess(true)
      setEmail('')
    } else {
      const responseText = await response.text()
      setIsError(responseText)
      console.error(responseText)
    }
    setIsSubmitting(false)
  }

  return (
    <Flex align="center" justify="center">
      <Box width="100%" maxWidth="500px" padding="4">
        <form onSubmit={handleSubmit} noValidate>
          <FormControl isInvalid={!!emailError}>
            <FormLabel>{t('login_email_address')}</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              placeholder={t('login_enter_email')}
            />
            <FormErrorMessage>{emailError}</FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="cyan"
            isLoading={isSubmitting}
            type="submit"
            width="100%"
            disabled={isSubmitting}
          >
            {t('login_request_link')}
          </Button>

          {isSuccess && (
            <Center mt={4} color="green.500">
              <CheckCircleIcon mr={2} />
              <Text>{t('login_email_sent')}</Text>
            </Center>
          )}

          {isError && (
            <Center mt={4} color="red.500">
              <WarningIcon mr={2} />
              <Text>{isError}</Text>
            </Center>
          )}

          {isSubmitting && (
            <Center mt={4}>
              <Spinner />
            </Center>
          )}
        </form>
      </Box>
    </Flex>
  )
}
