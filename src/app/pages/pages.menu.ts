export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Tablero Principal',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0,
          },
        },
      },
      {
        path: 'settings',
        data: {
          menu: {
            title: 'Configuración',
            icon: 'ion-android-settings',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 10,
          },
        },
        children: [
          {
            path: 'constants',
            data: {
              menu: {
                title: 'Constantes',
                icon: 'ion-ios-list-outline',
              },
            },
          },
          {
            path: 'users',
            data: {
              menu: {
                title: 'Usuarios',
                icon: 'ion-android-contact',
              },
            },
          },
          {
            path: 'routes',
            data: {
              menu: {
                title: 'Rutas',
                icon: 'ion-android-globe',
              },
            },
          },
          {
            path: 'profiles',
            data: {
              menu: {
                title: 'Perfiles',
                icon: 'ion-android-contacts',
              },
            },
          },
          {
            path: 'providers',
            data: {
              menu: {
                title: 'Proveedores',
                icon: 'ion-briefcase',
              },
            },
          },
          {
            path: 'metrics',
            data: {
              menu: {
                title: 'Métricas',
                icon: 'ion-ios-settings-strong',
              },
            },
            children: [
              {
                path: 'careers',
                data: {
                  menu: {
                    title: 'Carreras',
                  },
                },
              },
              {
                path: 'teachers',
                data: {
                  menu: {
                    title: 'Docentes',
                  },
                },
              },
              {
                path: 'laboratories',
                data: {
                  menu: {
                    title: 'Laboratorios',
                  },
                },
              },
              {
                path: 'practical_types',
                data: {
                  menu: {
                    title: 'Tipos de prácticas',
                  },
                },
              },
              {
                path: 'directed_practices',
                data: {
                  menu: {
                    title: 'Prácticas dirigidas',
                  },
                },
              },
              {
                path: 'locations',
                data: {
                  menu: {
                    title: 'Ubicaciones',
                  },
                },
              },
            ],
          },
          {
            path: 'subjects',
            data: {
              menu: {
                title: 'Materias',
                icon: 'ion-university',
              },
            },
          },
          {
            path: 'schedules',
            data: {
              menu: {
                title: 'Horarios',
                icon: 'ion-calendar',
              },
            },
          },
        ],
      },
      {
        path: 'stores',
        data: {
          menu: {
            title: 'Almacén',
            icon: 'ion-cube',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 10,
          },
        },
        children: [
          {
            path: 'entries',
            data: {
              menu: {
                title: 'Entradas',
                icon: 'ion-log-in',
              },
            },
          },
          {
            path: 'stocks',
            data: {
              menu: {
                title: 'Inventario',
                icon: 'ion-clipboard',
              },
            },
          },
        ],
      },
      {
        path: 'request',
        data: {
          menu: {
            title: 'Solicitudes',
            icon: 'ion-android-call',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 10,
          },
        },
        children: [
          {
            path: 'requests',
            data: {
              menu: {
                title: 'Préstamos',
                icon: 'ion-ios-loop-strong',
              },
            },
          },
          {
            path: 'practices',
            data: {
              menu: {
                title: 'Materiales',
                icon: 'ion-ios-flask',
              },
            },
          },
        ],
      },
      {
        path: 'maintenance',
        data: {
          menu: {
            title: 'Mantenimientos',
            icon: 'ion-settings',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 10,
          },
        },
        children: [
          {
            path: 'correctives',
            data: {
              menu: {
                title: 'Correctivos',
                icon: 'ion-checkmark-circled',
              },
            },
          },
          {
            path: 'controls',
            data: {
              menu: {
                title: 'Controles',
                icon: 'ion-android-hand',
              },
            },
          },
          {
            path: 'preventives',
            data: {
              menu: {
                title: 'Preventivos',
                icon: 'ion-alert-circled',
              },
            },
          },
        ],
      },
    ],
  },
];
