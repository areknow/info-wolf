import { fireEvent, render } from '@testing-library/react';
import { Stepper } from './stepper';

describe('Stepper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Stepper
        label="foo"
        value={1}
        step={1}
        minimum={0}
        type="time"
        onChange={jest.fn()}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should show label', () => {
    const label = 'foo';
    const { queryByText } = render(
      <Stepper
        label={label}
        value={1}
        step={1}
        minimum={0}
        type="time"
        onChange={jest.fn()}
      />
    );
    expect(queryByText(label)).toBeTruthy();
  });

  it('should show percent type value', () => {
    const { queryByText } = render(
      <Stepper
        label="foo"
        value={10}
        step={1}
        minimum={0}
        type="percent"
        onChange={jest.fn()}
      />
    );
    expect(queryByText('10%')).toBeTruthy();
  });

  it('should show time (s) type value', () => {
    const { queryByText } = render(
      <Stepper
        label="foo"
        value={1000}
        step={1}
        minimum={0}
        type="time"
        onChange={jest.fn()}
      />
    );
    expect(queryByText('1s')).toBeTruthy();
  });

  it('should show time (s) type value', () => {
    const { queryByText } = render(
      <Stepper
        label="foo"
        value={60000}
        step={1}
        minimum={0}
        type="time"
        onChange={jest.fn()}
      />
    );
    expect(queryByText('1m')).toBeTruthy();
  });

  it('should increment value by step', () => {
    const value = 1000;
    const step = 1000;
    let changedVal: number;
    const { queryByTestId } = render(
      <Stepper
        label="foo"
        value={value}
        step={step}
        minimum={0}
        type="time"
        onChange={(val) => (changedVal = val)}
      />
    );
    fireEvent.click(queryByTestId('stepper-trigger-plus'));
    expect(changedVal).toEqual(value + step);
  });

  it('should decrement value by step', () => {
    const value = 2000;
    const step = 1000;
    let changedVal: number;
    const { queryByTestId } = render(
      <Stepper
        label="foo"
        value={value}
        step={step}
        minimum={0}
        type="time"
        onChange={(val) => (changedVal = val)}
      />
    );
    fireEvent.click(queryByTestId('stepper-trigger-minus'));
    expect(changedVal).toEqual(value - step);
  });

  it('should not decrement value past minimum', () => {
    const value = 0;
    const step = 1000;
    let changedVal: number;
    const { queryByTestId } = render(
      <Stepper
        label="foo"
        value={value}
        step={step}
        minimum={0}
        type="time"
        onChange={(val) => (changedVal = val)}
      />
    );
    fireEvent.click(queryByTestId('stepper-trigger-minus'));
    expect(changedVal).toEqual(0);
  });
});
