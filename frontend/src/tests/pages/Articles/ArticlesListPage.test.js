import { fireEvent, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ArticlesListPage from "main/pages/Articles/ArticlesListPage";
import { articlesFixtures } from "fixtures/articlesFixtures";


import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import _mockConsole from "jest-mock-console";


const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("ArticlesListPage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    const testId = "ArticlesTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/artcles/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesListPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/articles/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesListPage />
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders three diningCommon without crashing for regular user", async () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/articles/all").reply(200, articlesFixtures.threeArticles);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesListPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(  () => { expect(getByTestId(`ArticlesTable-cell-row-0-col-title`)).toHaveTextContent("Apple iPhone12"); } );
        expect(getByTestId(`ArticlesTable-cell-row-1-col-title`)).toHaveTextContent("Samsung pad");
        expect(getByTestId(`ArticlesTable-cell-row-2-col-title`)).toHaveTextContent("Google pixel");

    });

    test("renders three articles without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/articles/all").reply(200, articlesFixtures.threeArticles);

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesListPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(  () => { expect(getByTestId(`ArticlesTable-cell-row-0-col-title`)).toHaveTextContent("Apple iPhone12"); } );
        expect(getByTestId(`ArticlesTable-cell-row-1-col-title`)).toHaveTextContent("Samsung pad");
        expect(getByTestId(`ArticlesTable-cell-row-2-col-title`)).toHaveTextContent("Google pixel");

    });

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/articles/all").timeout();

        const { queryByTestId, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesListPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(3); });

        const expectedHeaders = ['id',  'title', 'url','explanation','email','dateAdded'];

        expectedHeaders.forEach((headerText) => {
          const header = getByText(headerText);
          expect(header).toBeInTheDocument();
        });

        expect(queryByTestId(`${testId}-cell-row-0-col-code`)).not.toBeInTheDocument();
    });

});




