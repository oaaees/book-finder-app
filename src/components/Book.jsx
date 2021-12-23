import React from 'react';

const Book = ({title, authors, publisher, summary, image, link}) => {
	return(
		<div className="book">
			<div className="image">
				<a href={link} target="_blank">
					<img src={image} alt="Book Cover" />
				</a>
			</div>
			<div className="description">
				<div>
					<h2>{title}</h2>
					<h4>By: {authors.map(author => (author + '. '))}</h4>
					<h4>Published by: {publisher}.</h4>
				</div>
				<p className="summary">{summary}</p>
				<div><a href={link} target="_blank">Read More</a></div>
			</div>
		</div>
	);
};

export default Book;