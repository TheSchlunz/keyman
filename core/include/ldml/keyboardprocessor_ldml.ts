
// Notice!
//
// If you update this file, you *must* be sure to re-run
//
//  core/tools/ldml-const-builder/build.sh clean build run
//
// To update keyboardprocessor_ldml.h, and commit the result.
//
// It is not updated automatically.

// TODO-LDML: namespace com.keyman.core.ldml {
    /**
     * Constants for the KMXPlus data format
     * These are shared between the data access layer and the compiler
     */
    export const constants = {
        /**
         * The version of the LDML processor
         */
        version: '1.0',

        /**
         * Section ID for the keybag
         */
        section_keys: 'keys',
        /**
         * Section ID for the locale list
         */
        section_loca: 'loca',
        /**
         * Section ID for the metadata
         */
        section_meta: 'meta',
        /**
         * Section ID for the section header
         */
        section_sect: 'sect',
        /**
         * Section ID for the string table
         */
        section_strs: 'strs',

        /**
         * bitwise or value for fallback=omit in meta.settings
         */
         meta_settings_fallback_omit: 1,
        /**
         * bitwise or value for transformFailure=omit in meta.settings
         */
         meta_settings_transformFailure_omit: 2,
        /**
         * bitwise or value for transformPartial=hide in meta.settings
         */
         meta_settings_transformPartial_hide: 4,

         /**
          * bitwise or value for extend in strs[key].flags.
          * If bit is 1, then 'to' is a string.
          * If bit is 0, then 'to' is an offset.
          *
          * `extend = flags & strs_flags_extend`
          */
         strs_flags_extend: 1,
        };
// }