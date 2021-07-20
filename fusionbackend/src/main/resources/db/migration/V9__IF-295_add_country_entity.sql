create sequence idgen_country;
alter sequence idgen_country owner to postgres;

create table if not exists country
(
    id bigint not null
        constraint country_pkey
            primary key,
    version bigint,
    name varchar(255) not null
);


alter table factory_site
    drop column country;

alter table factory_site
    add country_id bigint;

alter table factory_site
    add constraint factory_site_country__fk
        foreign key (country_id) references country (id);


-- country master data
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Afghanistan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Albania');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Algeria');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'American Samoa');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Andorra');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Angola');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Anguilla');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Antarctica');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Antigua and Barbuda');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Argentina');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Armenia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Aruba');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Australia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Austria');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Azerbaijan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Bahamas');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Bahrain');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Bangladesh');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Barbados');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Belarus');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Belgium');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Belize');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Benin');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Bermuda');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Bhutan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Bolivia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Bosnia and Herzegovina');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Botswana');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Bouvet Island');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Brazil');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'British Indian Ocean Territory');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Brunei Darussalam');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Bulgaria');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Burkina Faso');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Burundi');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Cambodia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Cameroon');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Canada');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Cape Verde');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Cayman Islands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Central African Republic');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Chad');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Chile');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'China');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Christmas Island');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Cocos (Keeling) Islands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Colombia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Comoros');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Congo');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Congo, the Democratic Republic of the');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Cook Islands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Costa Rica');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Cote D''Ivoire');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Croatia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Cuba');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Cyprus');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Czech Republic');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Denmark');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Djibouti');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Dominica');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Dominican Republic');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Ecuador');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Egypt');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'El Salvador');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Equatorial Guinea');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Eritrea');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Estonia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Ethiopia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Falkland Islands (Malvinas)');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Faroe Islands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Fiji');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Finland');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'France');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'French Guiana');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'French Polynesia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'French Southern Territories');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Gabon');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Gambia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Georgia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Germany');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Ghana');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Gibraltar');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Greece');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Greenland');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Grenada');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Guadeloupe');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Guam');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Guatemala');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Guinea');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Guinea-Bissau');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Guyana');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Haiti');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Heard Island and Mcdonald Islands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Holy See (Vatican City State)');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Honduras');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Hong Kong');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Hungary');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Iceland');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'India');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Indonesia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Iran, Islamic Republic of');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Iraq');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Ireland');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Israel');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Italy');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Jamaica');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Japan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Jordan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Kazakhstan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Kenya');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Kiribati');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Korea, Democratic People''s Republic of');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Korea, Republic of');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Kuwait');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Kyrgyzstan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Lao People''s Democratic Republic');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Latvia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Lebanon');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Lesotho');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Liberia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Libyan Arab Jamahiriya');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Liechtenstein');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Lithuania');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Luxembourg');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Macao');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Macedonia, the Former Yugoslav Republic of');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Madagascar');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Malawi');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Malaysia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Maldives');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Mali');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Malta');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Marshall Islands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Martinique');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Mauritania');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Mauritius');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Mayotte');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Mexico');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Micronesia, Federated States of');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Moldova, Republic of');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Monaco');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Mongolia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Montserrat');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Morocco');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Mozambique');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Myanmar');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Namibia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Nauru');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Nepal');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Netherlands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Netherlands Antilles');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'New Caledonia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'New Zealand');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Nicaragua');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Niger');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Nigeria');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Niue');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Norfolk Island');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Northern Mariana Islands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Norway');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Oman');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Pakistan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Palau');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Palestinian Territory, Occupied');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Panama');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Papua New Guinea');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Paraguay');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Peru');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Philippines');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Pitcairn');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Poland');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Portugal');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Puerto Rico');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Qatar');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Reunion');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Romania');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Russian Federation');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Rwanda');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Saint Helena');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Saint Kitts and Nevis');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Saint Lucia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Saint Pierre and Miquelon');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Saint Vincent and the Grenadines');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Samoa');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'San Marino');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Sao Tome and Principe');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Saudi Arabia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Senegal');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Serbia and Montenegro');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Seychelles');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Sierra Leone');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Singapore');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Slovakia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Slovenia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Solomon Islands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Somalia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'South Africa');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'South Georgia and the South Sandwich Islands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Spain');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Sri Lanka');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Sudan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Suriname');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Svalbard and Jan Mayen');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Swaziland');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Sweden');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Switzerland');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Syrian Arab Republic');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Taiwan, Province of China');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Tajikistan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Tanzania, United Republic of');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Thailand');
insert into country (id, version, name) values (nextval('idgen_country'), 0,'Timor-Leste');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Togo');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Tokelau');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Tonga');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Trinidad and Tobago');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Tunisia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Turkey');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Turkmenistan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Turks and Caicos Islands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Tuvalu');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Uganda');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Ukraine');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'United Arab Emirates');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'United Kingdom');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'United States');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'United States Minor Outlying Islands');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Uruguay');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Uzbekistan');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Vanuatu');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Venezuela');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Viet Nam');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Virgin Islands, British');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Virgin Islands, U.s.');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Wallis and Futuna');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Western Sahara');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Yemen');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Zambia');
insert into country (id, version, name) values (nextval('idgen_country'), 0, 'Zimbabwe');
