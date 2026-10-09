const JsonLd = ({ data }: { data: object }) => (
	<script type='application/ld+json'>{JSON.stringify(data)}</script>
);

export default JsonLd;
