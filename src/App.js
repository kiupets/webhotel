import React from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import { Provider } from './context/ThumbContext';
import { Provider as DatesProvider } from './context/DatesContext';
import { Provider as FormProvider } from './context/FormContext';
import { Provider as IdProvider } from './context/IdContext';

export default function App() {
	return (
		<IdProvider>
			<FormProvider>
				<DatesProvider>
					<Provider>
						<Container />
					</Provider>
				</DatesProvider>
			</FormProvider>
		</IdProvider>
	);
}
