// REACT
import React                        from 'react';
import { render }                   from 'react-dom';
import { Provider }                 from 'react-redux';
import { HashRouter  as Router }    from "react-router-dom";

// REDUX STORE
import store                        from './state/store';

// COMPONENTS
import AppContainer                 from './components/AppContainer';
import ErrorBoundary                from './components/ErrorBoundary.jsx';

// MATERIAL UI
import { MuiThemeProvider }         from '@material-ui/core/styles';
import 'typeface-roboto';
import { theme }                    from './theme';


render(
    <ErrorBoundary>
        <Provider store={ store }>
            <Router>
                <MuiThemeProvider theme={theme}>
                    <AppContainer />
                </MuiThemeProvider>
            </Router>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('main')
);

