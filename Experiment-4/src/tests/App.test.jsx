import { describe, test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";

describe("App", () => {
  test("renders seeded events on the calendar", () => {
    render(<App />);
    expect(screen.getByText("Sprint planning")).toBeInTheDocument();
  });

  test("adding a new event shows it on the correct day", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /add event/i }));

    // Modal is lazy-loaded; wait for it to appear.
    const dialog = await screen.findByRole("dialog", { name: /add event/i });

    await user.type(within(dialog).getByLabelText(/title/i), "Client call");
    await user.selectOptions(within(dialog).getByLabelText(/day/i), "Thursday");
    await user.click(within(dialog).getByRole("button", { name: /^add event$/i }));

    const thursdayColumn = screen.getByText("Thursday").closest(".day-column");
    expect(within(thursdayColumn).getByText("Client call")).toBeInTheDocument();
  });

  test("deleting an event removes it from the calendar", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText("Morning run")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /delete "morning run"/i }));

    expect(screen.queryByText("Morning run")).not.toBeInTheDocument();
  });
});
