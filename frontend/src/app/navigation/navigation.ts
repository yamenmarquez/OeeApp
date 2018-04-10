export const navigation = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        // Se desabilita la funcionalidad de traducción
        // 'translate': 'NAV.APPLICATIONS',
        'type'    : 'group',
        'children': [
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
