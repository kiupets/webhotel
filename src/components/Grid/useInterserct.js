import { useEffect, useRef, useState, useContext } from 'react';
import { Context } from '../../context/DatesContext';
import { addYears, formatWithOptions } from 'date-fns/fp';
import { es } from 'date-fns/locale';

export default ({ root = null, rootMargin = '', threshold = 0 }) => {
	const [ entry, updateEntry ] = useState({});
	const [ node, setNode ] = useState(null);
	const { state } = useContext(Context);
	const { calendar } = state;
	const { intervalSignFront } = calendar;

	const observer = useRef(
		new IntersectionObserver(
			([ entry ]) => {
				if (entry.isIntersecting) {
					console.log('blablabla');
				}
				updateEntry(entry);
			},
			{
				root,
				rootMargin,
				threshold
			}
		)
	);

	useEffect(
		() => {
			const { current: currentObserver } = observer;
			currentObserver.disconnect();

			if (node) currentObserver.observe(node);

			return () => currentObserver.disconnect();
		},
		[ node ]
	);

	return [ setNode, entry ];
};
