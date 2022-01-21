#!/usr/bin/python3
import logging
import os
import subprocess
from gi.repository import Gio

from gi.overrides.GLib import Variant


class GSettings():
    def __init__(self, schema_id):
        """
        Wrapper around Gio Settings that deals with running under sudo
        """
        self.schema_id = schema_id
        if os.environ.get('SUDO_USER'):
            self.is_sudo = True
            logging.debug('Running with sudo. Real user: %s', os.environ.get('SUDO_USER'))
        else:
            self.schema = Gio.Settings.new(self.schema_id)
            self.is_sudo = False
            logging.debug('Running as regular user')

    def _convert_variant_to_array(self, variant):
        if variant is None:
            return []

        values = []
        # Process variant of type "a(ss)" (array of tuples with two strings)
        nChildren = variant.n_children()
        for i in range(nChildren):
            # Process variant of type "(ss)" (tuple with two strings)
            val = variant.get_child_value(i)
            typeVariant = val.get_child_value(0)
            type = typeVariant.get_string()
            idVariant = val.get_child_value(1)
            id = idVariant.get_string()
            values.append((type, id))
        return values

    def _convert_array_to_variant(self, array):
        if len(array) == 0:
            return Variant('a(ss)', None)

        children = []
        for (type, id) in array:
            typeVariant = Variant.new_string(type)
            idVariant = Variant.new_string(id)
            child = Variant.new_tuple(typeVariant, idVariant)
            children.append(child)
        return Variant.new_array(None, children)

    def get(self, key):
        if self.is_sudo:
            process = subprocess.run(
                ['sudo', '-H', '-u', os.environ.get('SUDO_USER'),
                 'DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/%s/bus' % os.environ.get('SUDO_UID'),
                 'gsettings', 'get', self.schema_id, key],
                capture_output=True)
            if process.returncode == 0:
                value = eval(process.stdout)
            else:
                value = None
                logging.warning('Could not convert to sources')
        else:
            variant = self.schema.get_value(key)
            value = self._convert_variant_to_array(variant)
        return value

    def set(self, key, value):
        if self.is_sudo:
            variant = str(value)
            subprocess.run(
                ['sudo', '-H', '-u', os.environ.get('SUDO_USER'),
                 'DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/%s/bus' % os.environ.get('SUDO_UID'),
                 'gsettings', 'set', self.schema_id, key, variant])
        else:
            variant = self._convert_array_to_variant(value)
            self.schema.set_value(key, variant)