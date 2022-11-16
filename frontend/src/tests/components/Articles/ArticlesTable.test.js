import {  render } from "@testing-library/react";
import { articlesFixtures } from "fixtures/articlesFixtures";
import ArticlesTable from "main/components/Articles/ArticlesTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("ArticlesTable tests", () => {
  const queryClient = new QueryClient();


  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ArticlesTable articles={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });
  test("renders without crashing for empty table for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ArticlesTable articles={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ArticlesTable articles={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected column headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ArticlesTable articles={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );


    const expectedHeaders = ['id',  'title', 'url','explanation','email','dateAdded'];
    const expectedFields = ['id',  'title', 'url','explanation','email','dateAdded'];
    const testId = "ArticlesTable";

    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = getByTestId(`ArticlesTable-header-url`);
      expect(header).toBeInTheDocument();
      const header2 = getByTestId(`ArticlesTable-header-id`);
      expect(header2).toBeInTheDocument();
      const header3 = getByTestId(`ArticlesTable-header-email`);
      expect(header3).toBeInTheDocument();
      const header4 = getByTestId(`ArticlesTable-header-dateAdded`);
      expect(header4).toBeInTheDocument();
    });

//    expect(getByTestId(`${testId}-cell-row-0-col-code`)).toHaveTextContent("de-la-guerra");
//    expect(getByTestId(`${testId}-cell-row-1-col-code`)).toHaveTextContent("ortega");
//    expect(getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("De La Guerra");
//    expect(getByTestId(`${testId}-cell-row-1-col-name`)).toHaveTextContent("Ortega");

    const deleteButton = getByTestId(`ArticlesTable-header-Delete`);
    expect(deleteButton).toBeInTheDocument();
  });


});

