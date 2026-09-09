import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventCard from "../components/EventCard.jsx";

const baseEvent = {
  id: "evt-1",
  title: "Meeting",
  day: "Monday",
  time: "09:00",
  category: "Work",
  completed: false,
};

describe("EventCard", () => {
  test("renders the event title and time", () => {
    render(
      <EventCard event={baseEvent} onDragStart={vi.fn()} onDelete={vi.fn()} onToggleComplete={vi.fn()} />
    );
    expect(screen.getByText("Meeting")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
  });

  test("calls onDelete with the event id when the delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(
      <EventCard event={baseEvent} onDragStart={vi.fn()} onDelete={onDelete} onToggleComplete={vi.fn()} />
    );

    await user.click(screen.getByRole("button", { name: /delete "meeting"/i }));

    expect(onDelete).toHaveBeenCalledWith("evt-1");
  });

  test("calls onToggleComplete when the checkbox is clicked", async () => {
    const user = userEvent.setup();
    const onToggleComplete = vi.fn();
    render(
      <EventCard event={baseEvent} onDragStart={vi.fn()} onDelete={vi.fn()} onToggleComplete={onToggleComplete} />
    );

    await user.click(screen.getByRole("checkbox"));

    expect(onToggleComplete).toHaveBeenCalledWith("evt-1");
  });
});
