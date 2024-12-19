/* eslint-disable react/prop-types */

export function MarkersComponent({
  map,
  React,
  HTTP,
  checkPermission,
  useQuery,
  LayerGroup,
  LayersControl,
  Marker,
  Tooltip,
  HideBasedOnAuth,
  L,
}) {
  const [markers, setMarkers] = React.useState([]);

  const { data } = useQuery('markers', async () => HTTP.get('/api/markers'));

  React.useEffect(() => {
    async function getMarkers() {
      if (checkPermission({ module: 'webapi.Markers', method: 'GET' })) {
        const markerComponents = data.map((marker) => {
          const {
            x,
            y,
            icon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Blue_question_mark_icon.svg/1200px-Blue_question_mark_icon.svg.png',
          } = marker;

          const iconComponent = L.icon({
            iconSize: [25, 25],
            iconUrl: icon,
          });

          return (
            <Marker key={marker.id} icon={iconComponent} position={{ lat: x, lng: y }}>
              <Tooltip>{marker.name}</Tooltip>
            </Marker>
          );
        });
        setMarkers(markerComponents);
      }
    }

    getMarkers();
  }, [data]);

  return (
    <HideBasedOnAuth requiredPermission={{ module: 'webapi.Markers', method: 'GET' }}>
      <LayersControl.Overlay name="Markers">
        <LayerGroup>{markers}</LayerGroup>
      </LayersControl.Overlay>
    </HideBasedOnAuth>
  );
}
