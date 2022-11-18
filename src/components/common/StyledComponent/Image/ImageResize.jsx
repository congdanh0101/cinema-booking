import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ImageResize = ({
	to,
	url,
	alt,
	className,
	imageError = 'images/no-image.png',
}) => {
	const [fallback, setFallback] = useState('');
	const handleErrorImage = () => {
		setFallback(imageError);
	};
	if (to) {
		return (
			<Link to={to}>
				<LazyLoadImage
					onError={handleErrorImage}
					className={className}
					src={url || fallback}
					effect="opacity"
					alt={alt}
				/>
			</Link>
		);
	}
	return (
		<LazyLoadImage
			onError={handleErrorImage}
			className={className}
			src={url || fallback}
			effect="opacity"
			alt={alt}
		/>
	);
};

ImageResize.defaultProps = {
	to: '',
	height: '',
	width: '',
	alt: '',
	className: '',
};

export default ImageResize;
