/* eslint-disable react/prop-types */
import './index.css';

export function MarkersSettings({
  React,
  styled,
  HTTP,
  EditableTable,
  FormElements,
  TfpForm,
  useForm,
  useQuery,
  useMutation,
  checkPermission,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { data, refetch } = useQuery('markers', async () => HTTP.get('/api/markers'));
  const { mutate: createMarker } = useMutation(
    'createMarker',
    (data) =>
      HTTP.post('/api/markers', {
        name: data.name,
        x: parseInt(data.x, 10),
        y: parseInt(data.y, 10),
      }),
    { onSuccess: () => refetch() }
  );
  const { mutate: deleteMarker } = useMutation('deleteMarker', (id) => HTTP.delete(`/api/markers/${id}`), { onSuccess: () => refetch() });
  const { mutate: updateMarker } = useMutation(
    'updateMarker',
    (data) =>
      HTTP.put(`/api/markers/${data.id}`, {
        name: data.name,
        x: parseInt(data.x, 10),
        y: parseInt(data.y, 10),
        icon: data.icon,
      }),
    {
      onSuccess: () => refetch(),
    }
  );

  const canEditRows = checkPermission({ module: 'webapi.Markers', method: 'PUT' });
  const canDeleteRows = checkPermission({ module: 'webapi.Markers', method: 'DELETE' });

  const columnDef = [
    { field: 'id', filter: 'agTextColumnFilter', flex: 1 },
    { field: 'name', filter: 'agTextColumnFilter', flex: 1 },
    { field: 'x', filter: 'agNumberColumnFilter', flex: 0.25, sort: 'asc' },
    { field: 'y', filter: 'agNumberColumnFilter', flex: 0.25, sort: 'asc' },
    { field: 'icon', filter: 'agTextColumnFilter', flex: 1 },
  ];

  const Form = (
    <TfpForm id="markers-form" error={errors}>
      <FormElements.StyledFormItem>
        <FormElements.FormLabel htmlFor="input-id">ID</FormElements.FormLabel>
        <FormElements.FormInput key="id" id="input-id" {...register('id')} disabled />
      </FormElements.StyledFormItem>

      <FormElements.StyledFormItem>
        <FormElements.FormLabel htmlFor="input-name">Name</FormElements.FormLabel>
        <FormElements.FormInput key="name" id="input-name" {...register('name')} />
      </FormElements.StyledFormItem>

      <FormElements.StyledFormItem>
        <FormElements.FormLabel htmlFor="input-x">X</FormElements.FormLabel>
        <FormElements.FormInput key="x" id="input-x" {...register('x', { required: true })} />
      </FormElements.StyledFormItem>

      <FormElements.StyledFormItem>
        <FormElements.FormLabel htmlFor="input-y">Y</FormElements.FormLabel>
        <FormElements.FormInput key="y" id="input-y" {...register('y', { required: true })} />
      </FormElements.StyledFormItem>
    </TfpForm>
  );

  async function handleCreate(data) {
    if (!checkPermission({ module: 'webapi.Markers', method: 'POST' })) {
      return;
    }
    createMarker(data);
  }

  async function handleEdit(data) {
    if (!checkPermission({ module: 'webapi.Markers', method: 'PUT' })) {
      return;
    }
    updateMarker(data);
  }

  async function cellDeleted(row) {
    if (!checkPermission({ module: 'webapi.Markers', method: 'DELETE' })) {
      return;
    }
    deleteMarker(row.id);
  }

  const setDefaultValues = (data) => {
    setValue('id', data.id);
    setValue('name', data.name);
    setValue('x', data.x);
    setValue('y', data.y);
  };

  return (
    <div style={{ flexDirection: 'row', height: '80vh' }}>
      <EditableTable
        columnDef={columnDef}
        rowData={data}
        reloadFn={refetch}
        deleteRowFn={cellDeleted}
        canDeleteRows={canDeleteRows}
        height={'90%'}
        editRowFn={handleSubmit(handleEdit)}
        editForm={Form}
        setDefaultValues={setDefaultValues}
        canEditRows={canEditRows}
        canCreateRows={canEditRows}
        createRowFn={handleSubmit(handleCreate)}
      />
    </div>
  );
}
