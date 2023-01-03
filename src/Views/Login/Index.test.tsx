import Login from './Index'
import { render, screen, act, waitFor } from '@testing-library/react'
import nock from 'nock'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { BackdropProvider } from '../../hooks/useBackdrop'
import { AlertProvider } from '../../hooks/useAlert'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate
}))

describe('login test', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env = {
      REACT_APP_APINOCODEURL: 'https://testeNoCode.com.br',
      REACT_APP_APIURL: 'https://teste.com.br',
      REACT_APP_SOCKETPORT: '3008',
      REACT_APP_TIRESIZE: '2096',
      REACT_APP_TOTALDIST: '200',
      NODE_ENV: 'test',
      PUBLIC_URL: 'http://localhost',
      REACT_APP_APITOKEN: 'token'
    }
  })

  afterAll(() => {
    nock.cleanAll()
    nock.restore()
  })

  it('checks if trys login', async () => {
    const loginCall = nock('http://localhost:3008')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*'
      })
      .post('/token', {
        email: 'teste@email.com',
        password: '123'
      })
      .reply(200, {
        token: 'token',
        name: 'teste',
        email: 'teste@email.com'
      })

    render(
      <BrowserRouter>
        <AlertProvider>
          <BackdropProvider>
            <Login />
          </BackdropProvider>
        </AlertProvider>
      </BrowserRouter>
    )

    await act(async () => {
      userEvent.type(screen.getByLabelText('Email'), 'teste@email.com')
      userEvent.type(screen.getByLabelText('Senha'), '123')
      userEvent.click(screen.getByText('Login'))
    })

    await waitFor(async () => {
      loginCall.isDone()
    })

    await waitFor(async () => {
      expect(mockedUsedNavigate).toBeCalled()
    })
  })
  it('checks if returns error', async () => {
    const loginCall = nock('http://localhost:3008')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*'
      })
      .post('/token', {
        email: 'teste@email.com',
        password: '123'
      })
      .reply(500, 'fail')

    render(
      <BrowserRouter>
        <AlertProvider>
          <BackdropProvider>
            <Login />
          </BackdropProvider>
        </AlertProvider>
      </BrowserRouter>
    )

    await act(async () => {
      userEvent.type(screen.getByLabelText('Email'), 'teste@email.com')
      userEvent.type(screen.getByLabelText('Senha'), '123')
      userEvent.click(screen.getByText('Login'))
    })

    await waitFor(async () => {
      loginCall.isDone()
    })

    await waitFor(async () => {
      expect(screen.getByText('Email ou senha inválidos'))
    })
  })
  it('checks if it sends the right body', async () => {
    const email = 'diferentTeste@email.com'
    const password = '321'

    const loginCall = nock('http://localhost:3008')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*'
      })
      .post('/token', e => {
        if (e.email !== email) throw Error
        if (e.password !== password) throw Error
        return e
      })
      .reply(200)

    render(
      <BrowserRouter>
        <AlertProvider>
          <BackdropProvider>
            <Login />
          </BackdropProvider>
        </AlertProvider>
      </BrowserRouter>
    )

    await act(async () => {
      userEvent.type(screen.getByLabelText('Email'), email)
      userEvent.type(screen.getByLabelText('Senha'), password)
      userEvent.click(screen.getByText('Login'))
    })

    await waitFor(async () => {
      loginCall.isDone()
    })
  })
})
