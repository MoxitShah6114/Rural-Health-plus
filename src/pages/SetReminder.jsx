import React, { useState } from 'react';
import styled from 'styled-components';
import { Bell, Plus, Trash2 } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

const Title = styled.h1`
  margin: 2rem 0;
  color: var(--text);
  font-size: 2.5rem;
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background-color: var(--background);
  color: var(--text);

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background-color: var(--background);
  color: var(--text);

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const RemindersList = styled.div`
  margin-top: 2rem;
`;

const ReminderCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ReminderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--danger);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: var(--border);
  }
`;

export const SetReminder = () => {
  const [reminders, setReminders] = useState([]);
  const [medicine, setMedicine] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('daily');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReminder = {
      id: Date.now().toString(),
      medicine,
      time,
      frequency,
    };
    setReminders([...reminders, newReminder]);
    setMedicine('');
    setTime('');
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <Container>
      <Title>Set Medication Reminder</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="medicine">Medicine Name</Label>
          <Input
            type="text"
            id="medicine"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            placeholder="Enter medicine name"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="time">Reminder Time</Label>
          <Input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="frequency">Frequency</Label>
          <Select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </FormGroup>

        <Button type="submit" variant="primary" fullWidth>
          <Plus size={16} />
          Add Reminder
        </Button>
      </Form>

      <RemindersList>
        {reminders.map((reminder) => (
          <ReminderCard key={reminder.id}>
            <ReminderInfo>
              <Bell size={20} />
              <div>
                <strong>{reminder.medicine}</strong>
                <div>
                  {reminder.time} - {reminder.frequency}
                </div>
              </div>
            </ReminderInfo>
            <DeleteButton onClick={() => deleteReminder(reminder.id)}>
              <Trash2 size={20} />
            </DeleteButton>
          </ReminderCard>
        ))}
      </RemindersList>
    </Container>
  );
};
