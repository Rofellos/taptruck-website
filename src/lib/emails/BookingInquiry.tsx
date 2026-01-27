/** @jsxImportSource react */

import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Hr
} from '@react-email/components';

type Props = {
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
};

export default function BookingInquiry({
  name,
  email,
  phone,
  date,
  message
}: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'system-ui' }}>
        <Container>
          <Heading>New Booking Inquiry</Heading>

          <Text><strong>Name:</strong> {name}</Text>
          <Text><strong>Email:</strong> {email}</Text>
          <Text><strong>Phone:</strong> {phone}</Text>
          <Text><strong>Event Date:</strong> {date}</Text>

          <Hr />

          <Text>{message}</Text>

          <Hr />

          <Text style={{ fontSize: 12, color: '#666' }}>
            Sent from taptruckvi.ca
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
