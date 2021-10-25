import { fireEvent, render, screen } from '@testing-library/react';
import HighScoreApp from './HighScoreApp';

test('should show the main title', () => {
  render(<HighScoreApp />);
  const title = screen.getByText('High Score App');
  expect(title).toBeInTheDocument();
});

it('updates the number of clicks when the play button is clicked', () => {
  render(<HighScoreApp />);
  const button = screen.getByText('Play');
  expect(screen.queryByText('Number of clicks: 0')).toBeInTheDocument();
  fireEvent.click(button);
  expect(screen.queryByText('Number of clicks: 1')).toBeInTheDocument();
});

it('displays an alert of the submit button is clicked without the name being entered', () => {
  render(<HighScoreApp />);
  const button = screen.getByText('Send it!');
  window.alert = jest.fn();
  fireEvent.click(button);
  expect(window.alert).toHaveBeenCalledTimes(1);
});

it('displays an alert if the play button is clicked when the user has clicked 10 times', () => {
  render(<HighScoreApp />);
  const button = screen.getByText('Play');
  window.alert = jest.fn();
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  expect(window.alert).toHaveBeenCalledTimes(1);
});
