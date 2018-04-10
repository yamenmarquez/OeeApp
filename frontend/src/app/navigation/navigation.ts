export const navigation = [
    {
        'id'      : 'applications',
        'title'   : 'Aplicación',
        // Se desabilita la funcionalidad de traducción
        // 'translate': 'NAV.APPLICATIONS',
        'type'    : 'group',
        'children': [
            {
              'id'   : 'home',
              'title': 'Inicio',
              'type' : 'item',
              'icon' : 'home',
              'url'  : '#'
            },
            {
              'id'        : 'planning' ,
              'title'     : 'Planificación',
              'type'      : 'collapse',
              'icon'      : 'today',
              'children'  : [
                {
                  'id'   : 'jobs',
                  'title': 'Órdenes de producción',
                  'type' : 'item',
                  'icon' : 'create_new_folder',
                  'url'  : '#'
                }
              ]
            },
            {
              'id'        : 'operation' ,
              'title'     : 'Operación',
              'type'      : 'collapse',
              'icon'      : 'business',
              'children'  : [
                {
                  'id'   : 'startShift',
                  'title': 'Iniciar turno',
                  'type' : 'item',
                  'icon' : 'arrow_forward',
                  'url'  : '#'
                },
                {
                  'id'   : 'openJobs',
                  'title': 'Órdenes abiertas',
                  'type' : 'item',
                  'icon' : 'folder_open',
                  'url'  : '#'
                },
                {
                  'id'   : 'closeJobs',
                  'title': 'Órdenes cerradas',
                  'type' : 'item',
                  'icon' : 'folder',
                  'url'  : '#'
                },
                {
                  'id'   : 'closeShift',
                  'title': 'Cerrar turno',
                  'type' : 'item',
                  'icon' : 'arrow_back',
                  'url'  : '#'
                }
              ]
            },
            {
              'id'        : 'results' ,
              'title'     : 'Resultados',
              'type'      : 'collapse',
              'icon'      : 'assessment',
              'children'  : [
                {
                  'id'   : 'checkOeeResults',
                  'title': 'Consultar Oee',
                  'type' : 'item',
                  'icon' : 'search',
                  'url'  : '#'
                },
                {
                  'id'   : 'checkHistoricalOee',
                  'title': 'Oee histórico',
                  'type' : 'item',
                  'icon' : 'format_list_numbered',
                  'url'  : '#'
                }
              ]
            },
            {
                'id'   : 'sample',
                'title': 'Sample',
                // Se desabilita la funcionalidad de traducción
                // 'translate': 'NAV.SAMPLE.TITLE',
                'type' : 'item',
                'icon' : 'email',
                'url'  : '/sample',
            }
        ]
    }
];
